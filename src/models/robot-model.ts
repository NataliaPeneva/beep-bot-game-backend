import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

import { Swarm } from './swarm-model'

const Schema = mongoose.Schema

export interface IRobot extends mongoose.Document {
  name: string
  robotname: string
  password: string
  swarm: Swarm
}

const RobotSchema = new Schema(
  {
    name: { type: String, required: true },
    robotname: { type: String, required: true },
    password: { type: String, required: true },
    swarm: { type: Swarm, required: false },
  },
  { timestamps: true }
)

RobotSchema.pre('save', (next: mongoose.HookNextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const robot: any = this

  if (!robot.password) {
    next()
  }

  bcrypt.genSalt(10, (err: any, salt: string): void => {
    if (err) {
      throw new Error(err)
    } else {
      bcrypt.hash(robot.password, salt, (err: any, hashed: string): void => {
        if (err) {
          return next(err)
        }
        robot.password = hashed
        next()
      })
    }
  })
})

export default mongoose.model<IRobot>('Robot', RobotSchema)
