import React from 'react'
import {Link} from 'react-router-dom'

function Footer({props}){
	return(
		<footer className="footer bg-secondary mt-5 py-3">
	        <div className="container">
	            <div className="row">             
	                <div className="col-6">
	                    <h5 className="text-black">Links</h5>
	                    <ul className="list-unstyled">
	                        <li><Link to = "/chess/home" className="text-white">Home</Link></li>
	                        <li><Link to = "/chess/browsegames" className="text-white">Browse Games</Link></li>
	                        <li><Link to = "/chess/browseplayers" className="text-white">Browse Players</Link></li>
	                        <li><Link to = "/chess/analysis" className="text-white">Analysis</Link></li>
	                        <li><Link to = "/chess/contactus" className="text-white">Contact Us</Link></li>
	                    </ul>
	                </div>
	            </div>
            </div>
        </footer>
	)
}

export default Footer