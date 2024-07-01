import { NavLink,Form } from "react-router-dom";

import logomark from "../assets/logomark.svg";

export default function Nav({userName}) {
    return (
        <nav>
            <NavLink to="/">
                <img src={logomark} alt="home-logo" height={30}/>
                <span>HomeBudget</span>
            </NavLink>
            {
                userName && (
                    <Form 
                    method="post"
                    action="/logout"
                    onSubmit={(event)=>{
                        if(!(window.confirm("This action will delete user's all data?"))){
                            event.preventDefault();
                        }
                    }}
                    >
                        <button type="submit" className="btn btn--warning"><span>Delete User</span></button>
                    </Form>
                )
            }
        </nav>
    );
}