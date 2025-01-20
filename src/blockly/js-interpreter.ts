import Interpreter from 'js-interpreter';
import { motor_pwm_wrapper, emergency_stop_wrapper } from './blocks/motor_blocks';
import { solenoid_state_wrapper } from './blocks/solenoid_blocks';
import { servo_angle_wrapper } from './blocks/servo_blocks';
import { blmd_speed_wrapper } from './blocks/blmd_blocks';
import { sleep_wrapper } from './blocks/control_blocks';

function init_motor_api(interpreter: Interpreter, globalObject: object) {
  interpreter.setProperty(globalObject, 'motor_pwm', interpreter.createNativeFunction(motor_pwm_wrapper));
  interpreter.setProperty(globalObject, 'emergency_stop', interpreter.createNativeFunction(emergency_stop_wrapper));
}
function init_solenoid_api(interpreter: Interpreter, globalObject: object) {
  interpreter.setProperty(globalObject, 'solenoid_state', interpreter.createNativeFunction(solenoid_state_wrapper));
}
function init_servo_api(interpreter: Interpreter, globalObject: object) {
  interpreter.setProperty(globalObject, 'servo_angle', interpreter.createNativeFunction(servo_angle_wrapper));
}
function init_blmd_api(interpreter: Interpreter, globalObject: object) {
  interpreter.setProperty(globalObject, 'blmd_speed', interpreter.createNativeFunction(blmd_speed_wrapper));
}
function init_control_api(interpreter: Interpreter, globalObject: object) {
  interpreter.setProperty(globalObject, 'sleep', interpreter.createNativeFunction(sleep_wrapper));
}

let print: (output: string) => void;
export const setPrint = (func: (output: string) => void) => {
  print = func;
};
export function initApi(interpreter: Interpreter, globalObject: object) {
  // Add an API function for the alert() block.
  const alert_wrapper = (text: string) => {
    print(arguments.length ? text : '');
  };
  interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(alert_wrapper));

  init_motor_api(interpreter, globalObject);
  init_solenoid_api(interpreter, globalObject);
  init_servo_api(interpreter, globalObject);
  init_blmd_api(interpreter, globalObject);
  init_control_api(interpreter, globalObject);
}
