/*!
 * gaia-tsort - Topological sorting utility
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/**
 * ### tsort (edges)
 *
 * Topological sorting is a methodology used to organize a
 * directed-acyclic-graph (DAG). A DAG is a graph of nodes in
 * which there are no cyclic references, and therefor has
 * a specific starting and ending point.
 *
 * A set of edges is defined as an array, with each element being
 * an array of x, y pairs, where `x` is a parent of `y`.
 *
 * ```js
 * var edges = [
 *     [ 'a', 'b' ]
 *   , [ 'a', 'c' ]
 *   , [ 'd', 'e' ]
 *   , [ 'b', 'd' ]
 * ];
 * ```
 *
 * With the above edges, we expect `a` to be the top-most parent.
 * `b` and `c` are it's children; `d` is a child of `b`; `e` is a
 * child of `d`.
 *
 * The following demonstrates the output of this tool.
 *
 * ```js
 * var tsort = require('gaia-tsort')
 *   , sorted = tsort(edges);
 *
 * // console.log(sorted);
 * {
 *     path: [ 'a', 'c', 'b', 'd', 'e' ]
 *   , graph: [
 *         { id: 'a', children: [ 'b', 'c' ], parents: [] }
 *       , { id: 'c', children: [], parents: [ 'a' ] }
 *       , { id: 'b', children: [ 'd' ], parents: [ 'a' ] }
 *       , { id: 'd', children: [ 'e' ], parents: [ 'b' ] }
 *       , { id: 'e', children: [], parents: [ 'd' ] }
 *     ]
 * }
 * ```
 *
 * Should there a cyclical reference, the result will resemble the following.
 *
 * ```js
 * {
 *   error: new Error('child-name can not come before parent-name')
 * }
 * ```
 *
 * @param {Array} edges
 * @return {Object}
 * @api public
 */

module.exports = function (edges) {
  var graph = []
    , nodes = {}
    , sorted = []
    , visited = {}
    , critical;

  // node constructor
  function N (id) {
    this.id = id;
    this.children = [];
    this.parents = [];
  }

  // recursively visit nodes
  function doVisit (idstr, ancestors) {
    var node = nodes[idstr]
      , id = node.id;

    if (visited[idstr]) return;
    if (!Array.isArray(ancestors))
      ancestors = [];

    ancestors.push(id);
    visited[idstr] = true;

    // deep recursive checking
    node.children.forEach(function (afterId) {
      if (ancestors.indexOf(afterId) >= 0)
        throw new Error(id + ' can not come before ' + afterId);
      var aid = afterId.toString()
        , anc = ancestors.map(function (v) { return v });
      doVisit(aid, anc);
    });

    sorted.unshift(id);
  }

  function doFilter (s) {
    return null !== s && 'undefined' !== typeof s;
  }

  // parse edges into nodes
  edges.forEach(function (v) {
    var from = v[0]
      , to = v[1];
    if (!nodes[from]) nodes[from] = new N(from);
    if (!nodes[to]) nodes[to] = new N(to);
    if (!~nodes[to].parents.indexOf(from))
      nodes[to].parents.push(from);
    if (!~nodes[from].children.indexOf(to))
      nodes[from].children.push(to);
  });

  // do our recursion
  // TODO: without try catch
  try { Object.keys(nodes).forEach(doVisit); }
  catch (ex) { return { error: ex } };

  // order our children object
  critical = sorted.filter(doFilter);

  critical.forEach(function (v) {
    var n = nodes[v];
    n.children = n.children.filter(doFilter);
    n.parents = n.parents.filter(doFilter);
    graph.push(n);
  });

  return { path: critical, graph: graph };
};
