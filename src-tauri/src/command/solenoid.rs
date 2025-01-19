use motor_lib::{device_type, sd, USBHandle};
use tauri::State;

#[tauri::command]
pub fn solenoid_state(handle: State<'_, USBHandle>, address: u8, port: u8, state: i16) {
    let result = sd::send_power(&*handle, address | device_type::SD, port, state).unwrap();
    println!("{:?}", result);
}
