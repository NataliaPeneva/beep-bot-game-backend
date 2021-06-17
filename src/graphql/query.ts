/* eslint-disable @typescript-eslint/no-explicit-any */
import * as graphql from 'graphql'

import Robot from '@local/models/robot-model'
import Skill from '@local/models/skill-model'
import { RobotType, SkillType } from './type'
import { validateToken } from '@local/middlewares/validate-token'

const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    robot: {
      type: RobotType,
      resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        const robot = validateToken(authorization)

        return Robot.findById(robot.id)
      },
    },
    opponent: {
      type: SkillType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        validateToken(authorization)

        return Skill.findOne({ robotId: args.id })
      },
    },
    robots: {
      type: new GraphQLList(RobotType),
      resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        validateToken(authorization)
        return Robot.find()
      },
    },
    opponents: {
      type: new GraphQLList(RobotType),
      async resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        const robotInfo = validateToken(authorization)
        const robot = await Robot.findById(robotInfo.id)
        return Robot.find({ swarm: { $ne: robot?.swarm } })
      },
    },
    skill: {
      type: SkillType,
      args: { robotId: { type: GraphQLID } },
      resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        const robot = validateToken(authorization)
        return Skill.findOne({ robotId: robot.id })
      },
    },
    skills: {
      type: new GraphQLList(SkillType),
      resolve(parent: any, args: any, { headers }: any) {
        const { authorization } = headers
        validateToken(authorization)
        return Skill.find()
      },
    },
  },
})
