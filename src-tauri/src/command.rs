pub mod blmd;
pub mod motor;
pub mod servo;
pub mod solenoid;

pub use blmd::*;
pub use motor::*;
pub use servo::*;
pub use solenoid::*;

use motor_lib::{send_emergency, USBHandle};
use tauri::State;

#[tauri::command]
pub fn emergency_stop(handle: State<'_, USBHandle>) {
    send_emergency(&*handle).unwrap();
}
