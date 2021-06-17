import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface ISkill extends mongoose.Document {
  strength: Number
  dexterity: Number
  faith: Number
  intelligence: Number
  agility: Number
  robotId: string
}

const SkillSchema = new Schema({
  strength: { type: Number },
  dexterity: { type: Number },
  faith: { type: Number },
  intelligence: { type: Number },
  agility: { type: Number },

  robotId: { type: String, required: true },
})

export default mongoose.model<ISkill>('Skill', SkillSchema)
