const { Rental } = require('../../src/models/rental');
const mongoose = require('mongoose');

describe('/api/returns', () => {
    let server;
    let rental;
    let userId;
    let bookId;

    beforeEach(async () => {
        server = require('../../src/index');
        userId = mongoose.Types.ObjectId();
        bookId = mongoose.Types.ObjectId();
        rental = new Rental({
            user: {
                _id: userId
            },
            book: {
                _id: bookId
            }
        });
        await rental.save();
    });
    afterEach(async () => {
        server.close();
        await rental.remove();
    });
    it('should work', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    })
})