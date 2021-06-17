import * as yup from 'yup'
import * as bcrypt from 'bcrypt'

import Robot from '@local/models/robot-model'

export const signUpRules = yup.object().shape({
  name: yup.string().trim().required(),
  robotname: yup
    .string()
    .trim()
    .required()
    .min(3, 'Robotname is too short')
    .test('uniqueRobot', 'This robot already exists', async (robotname) => {
      const robot = await Robot.findOne({ robotname })
      return !robot
    }),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, 'Password is too short')
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password can only contain Latin letters, numbers and/or [@, !, #, %].'
    ),
})

export const loginRules = yup.object().shape({
  robotname: yup
    .string()
    .trim()
    .required()
    .test('robotnameCheck', 'Invalid robotname', async (robotname) => {
      const robot = await Robot.findOne({ robotname })
      return !!robot
    }),
  password: yup
    .string()
    .trim()
    .required()
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password can only contain Latin letters, numbers and/or [@, !, #, %].'
    )
    .when('robotname', (robotname: string, schema: any) =>
      schema.test({
        test: async (password: string) => {
          const robot = await Robot.findOne({ robotname })
          const valid = await bcrypt.compare(password, robot!.password)
          return valid
        },
        message: 'Invalid password',
      })
    ),
})

export const swarmRules = yup.object().shape({
  swarm: yup
    .string()
    .required()
    .test(
      'uppercaseCheck',
      'Swarm can only accept upper case letters',
      (swarm) => {
        return swarm ? swarm === swarm.toUpperCase() : false
      }
    ),
})
