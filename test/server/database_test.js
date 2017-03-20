const database = require('../../server/database')

describe('database', function(){

  describe('requests', function(){

    describe('all', function(){

      it('should resolve with all requests in the db', function(){
        return database.requests.all()
          .then(requests => {
            expect(requests).to.be.an('array')
            expect(requests).to.have.length(0)
          })
      })

    })

  })


})
