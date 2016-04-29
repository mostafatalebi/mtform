$mtf.exportDefine( "mtForm", function(){
    var data = {};
    data.collection = $mtf.collection;
    data.collection_ordered = $mtf.collectionOrdered;
    data.collection_sequential = $mtf.collectionSequential;
    data.collection_parsed = $mtf.collectionParsed;
    data.form = $mtf.form;
    return data;
});