module.exports =  ({ x }) => {
    switch (x) {
        case 'Failed to connect to localhost:1433 - Could not connect (sequence)':
            return 'failed_to_connect_database'
        break;
        default:
            return x;
        break;
    }
}
