import React from 'react'

function Footer({props}){
	return(
		<footer className="footer bg-dark mt-5 py-3">
	        <div className="container">
	            <div className="row">             
	                <div className="col-6">
	                    <h5 className="text-white">Links</h5>
	                    <ul className="list-unstyled">
	                        <li><a href = "home" className="text-white">Home</a></li>
	                        <li><a href = "browsegames" className="text-white">Browse Games</a></li>
	                        <li><a href = "browseplayers" className="text-white">Browse Players</a></li>
	                        <li><a href = "analysis" className="text-white">Analysis</a></li>
	                        <li><a href = "contactus" className="text-white">Contact Us</a></li>
	                    </ul>
	                </div>
	            </div>
            </div>
        </footer>
	)
}

export default Footer