import { invoke } from "@tauri-apps/api/tauri"

export const Button = () => {
  
  const callOS = () => {
    // now we can call our Command!
    // Right-click the application background and open the developer tools.
    // You will see "Hello, World!" printed in the console!
    invoke('greet', { name: 'World' })
      .then(console.log)
      .catch(console.error)
    
    console.log('is clicked')
  }
  
  return <button onClick={callOS}>WEOW</button>
}