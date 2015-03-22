/**
 * Comments will be removed in the 'production' task
 */
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
