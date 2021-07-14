import React from "react"
import { Helmet } from "react-helmet"
import { useSiteData } from 'react-static'
import { useLocation } from "@reach/router"

export const Head = ({ title, description }) => {
	return (
		<>
			<Helmet>
				<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

				<title>{title}</title>
				<meta name="description" cotent={description} />

				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />

				<meta property="og:description" content={description} />
				<meta property="og:site_name" content={title} />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:site" content="@site_account" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />

				{/* <meta property="og:image" content="" /> */}
				{/* <meta name="twitter:image" content= /> */}

			</Helmet>
		</>
	)
}
