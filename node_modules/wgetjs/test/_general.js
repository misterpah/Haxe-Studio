var should   = require('should')
  , fs       = require('fs')
  , dst_dir  = '/tmp/'
  , filename = 'angleman.png'
  , dst_path = dst_dir + filename
  , rel_path = './' + filename
  , src_path  = 'https://raw.github.com/angleman/wgetjs/master/'
//  , src_path  = '~/projects/'
  , src_url  = src_path + filename
  , wget
;



describe('wgetjs', function() {
    describe('should', function() {

        it("load", function(){
            wget = require('../wget.js');
            should.exist(wget);
        }); 

        wget = require('../wget.js');

        it("return relative filepath: " + rel_path, function(){
            var testpath = wget({dry: true, url: src_url});
            should.exist(testpath);
            testpath.should.equal(rel_path);
        }); 

        it("return absolute filepath: " + dst_path, function(){
            var testpath = wget({dry: true, dest: dst_dir, url: src_url});
            should.exist(testpath);
            testpath.should.equal(dst_path);
        }); 

        var flag = false;
        var url  = src_url;
        var holderr, holdres, holddata = undefined;

        beforeEach(function(done){
            this.timeout(15 * 60 * 1000); // give it 15 seconds instead of 2
   
            wget({url: src_url, dest: dst_path}, function(err, data) {
                holderr  = err;
                holddata = data;
                done(); // complete the async beforeEach
            });

        });   

        it("load " + dst_path + " from " + src_url, function(){
            should.not.exist(holderr);
            should.exist(holddata);
            should.exist(holddata.filepath);
            holddata.filepath.should.equal(dst_path)
        }); 

    });

});