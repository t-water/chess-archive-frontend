import React from 'react'
import {Link} from 'react-router-dom'

function Footer({props}){
	return(
		<footer className="footer bg-dark mt-5 py-3">
	        <div className="container">
	            <div className="row">             
	                <div className="col-6">
	                    <h5 className="text-white">Links</h5>
	                    <ul className="list-unstyled">
	                        <li><Link to = "home" className="text-white">Home</Link></li>
	                        <li><Link to = "browsegames" className="text-white">Browse Games</Link></li>
	                        <li><Link to = "browseplayers" className="text-white">Browse Players</Link></li>
	                        <li><Link to = "analysis" className="text-white">Analysis</Link></li>
	                        <li><Link to = "contactus" className="text-white">Contact Us</Link></li>
	                    </ul>
	                </div>
	            </div>
            </div>
        </footer>
	)
}

export default Footer