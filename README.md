# Coachatron






## Schema / Data model


## Events

- create
- cancel
- start
- resolve
- escalate


## Example Event LifeCycle

create -> cancel
create -> start -> resolve
create -> start -> [ escalate -> start -> ] resolve





## GraphQL Queries

```
query {
  findUsers{
    name
    handle
    active
    createdAt
    roles
    stats {
      level
      elo
      experiencePoints
      cultureContribution
      teamPlay
      technicalHealth
      estimationAccuracy
      estimationBias
      challenge
      externalProjectReviewCount
      internalProjectReviewCount
      projectReviewAccuracy
      projectReviewExperience
    }
  }
}
```

```
query {
  findProjects{
    id
    name
    artifactURL
    goal {
      number
      title
    }
    cycle {
      cycleNumber
    }
    coach {
      handle
    }
    playerIds
    artifactURL
    coach{
      name
      handle
    }
  }
}
```
