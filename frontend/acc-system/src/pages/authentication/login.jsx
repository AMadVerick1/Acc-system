import './styles.css';

export default function Login() {
    return (
        <div className="form-container">
            <p className="title">Login</p>
            <form className="form">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Enter your username" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" />
                    <div className="forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
                <button type="submit" className="sign">Sign in</button>
            </form>
            <div className="social-message">
                <div className="line"></div>
                <p className="message">Login with social accounts</p>
                <div className="line"></div>
            </div>
            <div className="social-icons">
                <button aria-label="Log in with Google" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        {/* SVG Path */}
                    </svg>
                </button>
                <button aria-label="Log in with Twitter" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        {/* SVG Path */}
                    </svg>
                </button>
                <button aria-label="Log in with GitHub" className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        {/* SVG Path */}
                    </svg>
                </button>
            </div>
            <p className="signup">Don't have an account?
                <a rel="noopener noreferrer" href="#" className="">Sign up</a>
            </p>
        </div>
    );
}
