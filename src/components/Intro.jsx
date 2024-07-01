import { useFetcher } from "react-router-dom";

import illustration from "../assets/illustration.svg";

export default function Intro() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    return (
        <div className="intro">
            <div>
                <h1>Take Control of <span className="accent">Your Money</span></h1>
                <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
                <fetcher.Form method="post">

                    <input 
                    type="text" 
                    name="userName" 
                    placeholder="What's your name?"
                    autoComplete="given-name"
                    required
                    aria-label="your name"
                    />

                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                        {
                            isSubmitting?"Creating Account...":"Create Account"
                        }
                    </button>
                
                </fetcher.Form>
            </div>
            <img src={illustration} alt="person-saving-money" width={600}></img>
        </div>
    )
}