require(['data/SingleInstance', 'data/Producer'], function(instance, Producer) {
    var producer = new Producer();
    console.log('test producer');
    producer.test();

    instance.getState();
});