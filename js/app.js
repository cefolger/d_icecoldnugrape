require(['data/Producer', 'data/Consumer'], function(Producer, Consumer) {
    var producer = new Producer();
    console.log('test producer');
    producer.test();

    var consumer = new Consumer();
    console.log('testing again');
    consumer.test();
});