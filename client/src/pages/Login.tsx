export default function Login(){

    async function login(e: React.FormEvent<HTMLFormElement>){

        try {
            e.preventDefault()
    
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()
        if(!data.success){
            alert(data.message || 'Something went wrong')
            return
        }
        if(data.success){
            const token = data.token
            localStorage.setItem('token', token)
            window.location.href = "/";
        }

    } catch (error) {
        console.log('Something went wrong!')
        alert('Something went wrong!')
    }

    }

    return(
        <section className="flex flex-col justify-center items-center h-screen" >
            <form onSubmit={login} className="max-w-md mx-auto flex flex-col gap-4 w-full p-8 border rounded-md shadow-lg" >
            <h2 className="text-2xl mb-8 font-semibold" >Login to continue</h2>
                <input name="username" className="input input-bordered w-full" type="text" placeholder="Username" required={true} />
                <input name="password" className="input input-bordered w-full" type="password" placeholder="Password" required={true} />
                <button className="btn btn-primary w-full" >Login </button>
                <p>Don't have an account? <a className="text-blue-500 hover:underline" href="/register" >Register</a> </p>
            </form>
        </section>
    )
}