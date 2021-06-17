import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql'

import Robot from '@local/models/robot-model'

export const RobotType = new GraphQLObjectType({
  name: 'Robot',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    robotname: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    swarm: { type: GraphQLString },
  }),
})

export const SkillType = new GraphQLObjectType({
  name: 'Skill',
  fields: () => ({
    id: { type: GraphQLID },
    strength: { type: GraphQLInt },
    dexterity: { type: GraphQLInt },
    intelligence: { type: GraphQLInt },
    agility: { type: GraphQLInt },
    robot: {
      type: new GraphQLNonNull(RobotType),
      resolve(parent, args) {
        return Robot.findById(parent.robotId)
      },
    },
  }),
})

export const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString },
    robot: { type: RobotType },
  }),
})
