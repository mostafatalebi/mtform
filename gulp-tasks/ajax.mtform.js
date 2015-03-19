var gulp = require("gulp");
var uglify =  require("gulp-uglify");
var addsrc =  require("gulp-add-src");
var concat =  require("gulp-concat");

gulp.task("ajax", function(){
    var root_file = "js/plugins/Ajax/";

    return gulp.src(root_dir+"")
        .pipe(addsrc(root_file+"AjaxCall.js"))
        .pipe(addsrc(root_file+"Ajax.mtform.js"))
        .pipe(addsrc(root_file+"Ajax.mtform.extend.js"))
        .pipe( uglify() )
        .pipe( concat("formelement.mtform.0.0.1.js") )
        .pipe( gulp.dest("production/") );
});