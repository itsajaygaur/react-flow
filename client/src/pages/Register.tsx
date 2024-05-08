import { Link } from "react-router-dom";
import axios from "axios";


export default function Register(){

    async function register(e: React.FormEvent<HTMLFormElement>){

        try {
            

        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;
        const confirmPassword = e.currentTarget.confirmPassword.value;
        if(password !== confirmPassword){
            return alert("Passwords do not match");
        }
        const response = await axios.post("/register", {username, password})
        const data = await response.data
        if(data.success){
            alert("Registered successfully");
            window.location.href = "/login";
        }

    } catch (error) {
        console.log('Something went wrong!')
        alert('Something went wrong!')
    }
    }

    return(
        <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-violet-600 backdrop-blur-md" >
            <form onSubmit={register} className="max-w-md mx-auto flex flex-col gap-4 w-full p-8 border rounded-lg shadow-lg bg-white" >
                <h2 className="text-2xl mb-8 font-semibold" >Create an account</h2>
                <input name="username" className="input input-bordered w-full" type="text" placeholder="Username" required={true} />
                <input name="password" className="input input-bordered w-full" type="password" placeholder="Password" required={true} />
                <input name="confirmPassword" className="input input-bordered w-full" type="password" placeholder="Confirm Password" required={true} />
                <button className="btn btn-primary w-full" >Login </button>

                <p>Already have an account ? <Link className="text-blue-500 hover:underline" to="/login" >Login</Link> </p>
            </form>
        </section>
    )
}