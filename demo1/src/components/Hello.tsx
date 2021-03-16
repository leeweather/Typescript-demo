import * as React from 'react'
import { Grid } from './grid'

export interface HelloProps {
  compiler?: string
  framework: string
  [propName: string]: any
}

interface Point {
  readonly x: number
  readonly y: number
}

let point: Point = { x: 3, y: 4 }

let arr: ReadonlyArray<number> = [2, 3]

function creat(config: HelloProps): { color: string; area: string } {
  let color = config.compiler

  let area = config.framework

  return { color, area }
}

creat({ compiler: '33', framework: '33', hell: 3 })

interface SearchFunction {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunction = (src: string, sub: string): boolean => {
  return true
}

interface Alarm {
  aleat(): void
}

class Door {
  width: number
  height: number
  add(str: string): void {
    console.log('我是door里面的add',`拿到了${str}给的值`)
  }
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }
}

class MiniDoor extends Door {
  weight: number
  constructor(width: number, height: number,weight: number) {
    super(width, height)
    this.weight = weight
  }
}

class SecurityDoor extends Door implements Alarm {
  aleat() {
    console.log(22)
  }
}

console.log(new Door(1, 2).add('door实例'))
console.log(new MiniDoor(3,4,6).add('minidoor实例'))

export const Hello = (props: HelloProps) => {
  const getArr = (num1: number = 2, num2: number): boolean => {
    return num1 > num2
  }

  return (
    <h1>
      Hello from {props.compiler} and {props.framework}
      <Grid width={3} height={20} />
      {getArr(3, 1) ? 'num1大' : 'num2大'}
    </h1>
  )
}
