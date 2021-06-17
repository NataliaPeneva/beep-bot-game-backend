import * as yup from 'yup'

export const skillRules = yup.object().shape({
  robotname: yup.string().trim().required(),
})
