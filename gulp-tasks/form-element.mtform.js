var gulp = require("gulp");
var uglify =  require("gulp-uglify");
var addsrc =  require("gulp-add-src");
var concat =  require("gulp-concat");

gulp.task("form-element", function(){
    var root_file = "js/plugins/FormElement/";

    return gulp.src(root_dir+"")
        .pipe(addsrc(root_file+"FormElement.mtform.js"))
        .pipe(addsrc(root_file+"FormElement.mtform.extend.js"))
        .pipe( uglify() )
        .pipe( concat("formelement.mtform.0.0.1.js") )
        .pipe( gulp.dest("production/") );
});