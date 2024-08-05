import { model, Schema } from 'mongoose';

export const Usuario = model('usuario', new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
}));