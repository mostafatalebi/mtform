var gulp = require("gulp");
var uglify =  require("gulp-uglify");
var addsrc =  require("gulp-add-src");
var concat =  require("gulp-concat");

gulp.task("ajax", function(){
    var root_file = "js/plugins/Ajax/";

    return gulp.src(root_file+"")
        .pipe(addsrc(root_file+"AjaxCall.js"))
        .pipe(addsrc(root_file+"Ajax.mtform.js"))
        .pipe(addsrc(root_file+"Ajax.mtform.extend.js"))
        .pipe( uglify() )
        .pipe( concat("formelement.mtform.0.0.1.js") )
        .pipe( gulp.dest("production/") );
});

gulp.task("form-element", function(){
    var root_file = "js/plugins/FormElement/";

    return gulp.src(root_file+"")
        .pipe(addsrc(root_file+"FormElement.mtform.js"))
        .pipe(addsrc(root_file+"FormElement.mtform.extend.js"))
        .pipe( uglify() )
        .pipe( concat("formelement.mtform.0.0.1.js") )
        .pipe( gulp.dest("production/") );
});

gulp.task("production-with-plugins", ["valid", "ajax", "form-element"], function(){
    var root_file = "js/lib/mtform.";
    var plugin_root = "js/plugins/";

    gulp.src("js/lib/mtform.types.js")
        .pipe(addsrc(root_file+"core.js"))
        .pipe(addsrc(root_file+"general.js"))
        .pipe(addsrc(root_file+"parser.js"))
        .pipe(addsrc(root_file+"form.js"))
        .pipe(addsrc(root_file+"dom.js"))
        .pipe(addsrc(root_file+"rules.js"))
        .pipe(addsrc(root_file+"renderer.js"))
        .pipe(addsrc(root_file+"template.js"))
        .pipe(addsrc(root_file+"features.js"))
        .pipe(addsrc(root_file+"extend.js"))
        .pipe(addsrc(root_file+"init.js"))
        .pipe(addsrc(root_file+"export.js"))
        .pipe(addsrc(root_file+"dev_functions.js"))
        .pipe( uglify() )
        .pipe( concat("mtform.0.0.1.min.js") )
        .pipe( gulp.dest("production/") );
});

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
        .pipe( concat("valid.mtform-0.0.1.js") )
        .pipe( gulp.dest("production/") );
});

/**
 * Comments will be removed in the 'production' task
 */
gulp.task("production", function(){
    var root_file = "js/lib/mtform.";
    gulp.src("js/lib/mtform.types.js")
        .pipe(addsrc(root_file+"core.js"))
        .pipe(addsrc(root_file+"general.js"))
        .pipe(addsrc(root_file+"parser.js"))
        .pipe(addsrc(root_file+"form.js"))
        .pipe(addsrc(root_file+"dom.js"))
        .pipe(addsrc(root_file+"rules.js"))
        .pipe(addsrc(root_file+"renderer.js"))
        .pipe(addsrc(root_file+"template.js"))
        .pipe(addsrc(root_file+"features.js"))
        .pipe(addsrc(root_file+"extend.js"))
        .pipe(addsrc(root_file+"init.js"))
        .pipe(addsrc(root_file+"export.js"))
        .pipe(addsrc(root_file+"dev_functions.js"))
        .pipe( uglify() )
        .pipe( concat("mtform.0.0.1.min.js") )
        .pipe( gulp.dest("production/0.0.1") );
});