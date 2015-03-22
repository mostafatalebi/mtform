var gulp = require("gulp");
var uglify =  require("gulp-uglify");
var addsrc =  require("gulp-add-src");
var concat =  require("gulp-concat");

gulp.task("valid", function(){
    var root_file = "js/plugins/Ajax/";

    return gulp.src(root_file+"")
        .pipe(addsrc(root_file+"Valid.mtform.template.js"))
        .pipe(addsrc(root_file+"Valid.mtform.config.js"))
        .pipe(addsrc(root_file+"Valid.mtform.rules.js"))
        .pipe(addsrc(root_file+"Valid.mtform.init.js"))
        .pipe(addsrc(root_file+"Valid.mtform.js"))
        .pipe(addsrc(root_file+"Valid.mtform.extend.js"))
        .pipe( uglify() )
        .pipe( concat("valid.mtform.0.0.1.js") )
        .pipe( gulp.dest("production/") );
});