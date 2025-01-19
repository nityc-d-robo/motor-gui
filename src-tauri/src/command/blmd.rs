use motor_lib::{blmd, device_type, USBHandle};
use tauri::State;

#[tauri::command]
pub fn blmd_speed(handle: State<'_, USBHandle>, address: u8, controller_id: u8, velocity: i16) {
    let result = blmd::send_velocity(
        &*handle,
        address | device_type::BLMD,
        controller_id,
        velocity,
    )
    .unwrap();
    println!("{:?}", result);
}
