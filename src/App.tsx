import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const App = (): JSX.Element => {
	return (
		<Box
			sx={{
				display: `flex`,
				width: `100%`,
				height: `100vh`,
				justifyContent: `center`,
				alignItems: `center`,
			}}
		>
			<Button
				variant="contained"
				size="large"
				color="success"
				onClick={() => {
					// redirect("https://accounts.spotify.com/authorize", {
					// 	state: {
					// 		client_id: "28c510628cfa4d06af9b8b6803186dd8",
					// 		redirect_uri: `${import.meta.env.PUBLIC_URL}/home`,
					// 		response_type: "token",
					// 		scope: `user-top-read user-read-private`,
					// 	},
					// });
					// router.push({
					//   pathname: `https://accounts.spotify.com/authorize`,
					//   query: {
					//     client_id: `28c510628cfa4d06af9b8b6803186dd8`,
					//     redirect_uri: `${process.env.NEXT_PUBLIC_URL}/home`,
					//     response_type: `token`,
					//     scope: `user-top-read user-read-private`,
					//   },
					// })
				}}
			>
				<Link
					to={`https://accounts.spotify.com/authorize?client_id=28c510628cfa4d06af9b8b6803186dd8&redirect_uri=${
						import.meta.env.VITE_PUBLIC_URL
					}/home&response_type=token&scope=user-top-read user-read-private`}
					style={{
						color: "#fff",
					}}
				>
					Log in with Spotify
				</Link>
			</Button>
		</Box>
	);
};
