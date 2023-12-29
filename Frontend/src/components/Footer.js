import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>
            <footer className="bg-primary text-center text-white">
                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
                    © 2023 Copyright :
                    <Link className="text-black" style={{textDecoration: 'none'}} to="/"> FoodFlier</Link>
                </div>
            </footer>
        </div>
    )
}
