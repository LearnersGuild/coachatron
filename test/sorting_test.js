
const state1 = require('./fixtures/state1.json')


const now = '2017-03-20 14:09:46.332296-07'


const findPlayerByHandle = (state, handle) =>
  state.players.find(player => player.handle === handle)

const extractUnresolvedRequests = (state) =>
  state.requests.filter(r => r.resolved_at === null)

const extractMyProjects = (state, currentUser) =>
  state.project_coaches
    .filter(projectCoach => projectCoach.player_id === currentUser.id)

const extractMyTeams = (state, currentUser) => {
  const projectIds = extractMyProjects(state, currentUser).map(p => p.project_id)
  return state.teams.filter(team => projectIds.includes(team.project_id))
}

const deriveQueue = (state, currentUserHandle, now) => {
  const mow = moment(now)

  const me = findPlayerByHandle(state, currentUserHandle)

  const unresolvedRequests = extractUnresolvedRequests(state)

  const myTeams = extractMyTeams(state, me)
  const myTeamIds = myTeams.map(t => t.id)

  return state.requests.filter(request =>
    myTeamIds.includes(request.team_id)
  )
}


describe.only('sorting', function(){

  describe('findPlayerByHandle', function(){
    it('should work', function(){
      expect(findPlayerByHandle(state1, 'jrob8577')).to.deep.equal({
        "id": 5001,
        "handle": "jrob8577",
        "is_coach": true
      })
    })
  })

  describe('extractUnresolvedRequests', function(){
    it('should work', function(){
      expect(extractUnresolvedRequests(state1)).to.deep.equal([
        {
          "team_id": 6001,
          "created_at": "2017-03-20 13:59:46.332296-07",
          "resolved_at": null
        },
        {
          "team_id": 6002,
          "created_at": "2017-03-20 13:59:46.332296-07",
          "resolved_at": null
        }
      ])
    })
  })


  describe('extractMyProjects', function(){
    it('should work', function(){
      const jrob8577 = findPlayerByHandle(state1, 'jrob8577')
      const nicosesma = findPlayerByHandle(state1, 'nicosesma')
      expect(jrob8577).to.be.an('object')
      expect(nicosesma).to.be.an('object')
      expect(extractMyProjects(state1, jrob8577)).to.deep.equal([])
      expect(extractMyProjects(state1, nicosesma)).to.deep.equal([
        {
          "project_id": 7001,
          "player_id": 5003
        }
      ])
    })
  })

  describe('extractMyProjects', function(){
    it('should work', function(){
      const jrob8577 = findPlayerByHandle(state1, 'jrob8577')
      const nicosesma = findPlayerByHandle(state1, 'nicosesma')
      expect(jrob8577).to.be.an('object')
      expect(nicosesma).to.be.an('object')
      expect(extractMyTeams(state1, jrob8577)).to.deep.equal([])
      expect(extractMyTeams(state1, nicosesma)).to.deep.equal([
        {
          "id": 6001,
          "project_id": 7001,
          "name": "heftygorilla"
        },
      ])
    })
  })


  it('should work', function(){
    expect(deriveQueue(state1, 'deadlyicon', now)).to.deep.equal([])
    expect(deriveQueue(state1, 'jrob8577', now)).to.deep.equal([])

    expect(deriveQueue(state1, 'nicosesma', now)).to.deep.equal([
      {
        "team_id": 6001,
        "created_at": "2017-03-20 13:59:46.332296-07",
        "resolved_at": null
      }
    ])
    expect(deriveQueue(state1, 'ameliavoncat', now)).to.deep.equal([
      {
        "team_id": 6002,
        "created_at": "2017-03-20 13:59:46.332296-07",
        "resolved_at": null
      }
    ])
  })
})


