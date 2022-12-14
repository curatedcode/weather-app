import {checkState, verifyData } from './display'
import './styles.css'

document.querySelector('.get-weather').addEventListener('click',verifyData)

document.querySelector('select[name="country"]').onchange = checkState
document.querySelector('input[name="city"]').onchange = checkState