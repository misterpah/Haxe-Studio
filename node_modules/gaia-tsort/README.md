# gaia-tsort [![Build Status](https://secure.travis-ci.org/qualiancy/gaia-tsort.png?branch=master)](https://travis-ci.org/qualiancy/gaia-tsort)

> Topological sort utility for directed acyclic graphs.

## Installation

### Node.js

`gaia-tsort` is available on [npm](http://npmjs.org).

    $ npm install gaia-tsort

### Component

`gaia-tsort` is available as a [component](https://github.com/component/component).

    $ component install qualiancy/gaia-tsort

## Usage

### tsort (edges)

* **@param** _{Array}_ edges 
* **@return** _{Object}_  

Topological sorting is a methodology used to organize a
directed-acyclic-graph (DAG). A DAG is a graph of nodes in
which there are no cyclic references, and therefor has
a specific starting and ending point.

A set of edges is defined as an array, with each element being
an array of x, y pairs, where `x` is a parent of `y`.

```js
var edges = [
    [ 'a', 'b' ]
  , [ 'a', 'c' ]
  , [ 'd', 'e' ]
  , [ 'b', 'd' ]
];
```

With the above edges, we expect `a` to be the top-most parent.
`b` and `c` are it's children; `d` is a child of `b`; `e` is a
child of `d`.

The following demonstrates the output of this tool.

```js
var tsort = require('gaia-tsort')
  , sorted = tsort(edges);

// console.log(sorted);
{
    path: [ 'a', 'c', 'b', 'd', 'e' ]
  , graph: [
        { id: 'a', children: [ 'b', 'c' ], parents: [] }
      , { id: 'c', children: [], parents: [ 'a' ] }
      , { id: 'b', children: [ 'd' ], parents: [ 'a' ] }
      , { id: 'd', children: [ 'e' ], parents: [ 'b' ] }
      , { id: 'e', children: [], parents: [ 'd' ] }
    ]
}
```

Should there a cyclical reference, the result will resemble the following.

```js
{
  error: new Error('child-name can not come before parent-name')
}
```



## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@qualiancy.com> (http://qualiancy.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
