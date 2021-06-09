import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

import { Tribe } from './tribe-model'

const Schema = mongoose.Schema

export interface IWarrior extends mongoose.Document {
  name: string
  warriorname: string
  password: string
  tribe: Tribe
}

const WarriorSchema = new Schema(
  {
    name: { type: String, required: true },
    warriorname: { type: String, required: true },
    password: { type: String, required: true },
    tribe: { type: Tribe, required: false },
  },
  { timestamps: true }
)

WarriorSchema.pre('save', (next: mongoose.HookNextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const warrior: any = this

  if (!warrior.password) {
    next()
  }

  bcrypt.genSalt(10, (err: any, salt: string): void => {
    if (err) {
      throw new Error(err)
    } else {
      bcrypt.hash(warrior.password, salt, (err: any, hashed: string): void => {
        if (err) {
          return next(err)
        }
        warrior.password = hashed
        next()
      })
    }
  })
})

export default mongoose.model<IWarrior>('Warrior', WarriorSchema)
