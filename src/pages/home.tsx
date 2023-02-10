import React, { useRef } from "react";
import {
	// Backdrop,
	Box,
	Button,
	// SpeedDial,
	// SpeedDialAction,
	// SpeedDialIcon,
	Typography,
} from "@mui/material";
import domtoimage from "dom-to-image";
import { useQuery } from "react-query";
import { API } from "../common/api";
import TopTracks from "../components/TopTracks";
import { Link, useLocation } from "react-router-dom";
import "./../assets/fonts/Gotham-Bold.otf";
import "./../assets/fonts/Gotham-Light.otf";

// import { Save, Print, Share, PaletteRounded } from '@mui/icons-material'

const initialState = {
	access_token: ``,
	token_type: ``,
	expires_in: ``,
};

// const actions = [
//   { icon: <PaletteRounded />, name: `Change Background Color` },
//   { icon: <Save />, name: `Save` },
//   { icon: <Print />, name: `Print` },
//   { icon: <Share />, name: `Share` },
// ]

const Home = () => {
	const location = useLocation();
	const [values, setValues] = React.useState(initialState);
	const [tracks, setTracks] = React.useState<any[]>([]);
	const [user, setUser] = React.useState<any>({});
	// const [open, setOpen] = React.useState(false)
	// const handleDial = () => setOpen(!open)

	useQuery(`userData`, () => API.getUser(values), {
		enabled: !!values.access_token,
		onSuccess: (data) => {
			setUser(data);
		},
	});

	useQuery(`userTracks`, () => API.getTopArtists(values), {
		enabled: !!values.access_token,
		onSuccess: (data) => {
			setTracks(data);
		},
	});

	React.useEffect(() => {
		const path = location.hash.split(`#`)[1];
		setValues({
			access_token: `${path.split(`&`)[0].split(`=`)[1]}`,
			token_type: `${path.split(`&`)[1].split(`=`)[1]}`,
			expires_in: `${path.split(`&`)[2].split(`=`)[1]}`,
		});
	}, [location.hash]);

	const container = useRef(null);

	function exportToJPEG(dom: any) {
		domtoimage
			.toPng(dom)
			.then(function (dataUrl: string) {
				const link = document.createElement(`a`);
				link.href = dataUrl;
				link.download = `Spotifive.jpeg`;
				link.click();
			})
			.catch(function (error: any) {
				console.error(`oops, something went wrong!`, error);
			});
	}

	return (
		<>
			{/* <Backdrop
          open={open}
          sx={{
            zIndex: '2',
          }}
        /> */}
			{/* <SpeedDial
        ariaLabel="Settings"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
        onClick={handleDial}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial> */}
			<Box
				sx={{
					display: `flex`,
					width: `100%`,
					minHeight: `100vh`,
					alignItems: `center`,
					flexDirection: `column`,
					marginTop: `0px`,
					overflowX: "hidden",
				}}
			>
				{user && (
					<Box
						sx={{
							width: `60%`,
							display: `flex`,
							flexDirection: `column`,
							alignItems: `center`,
						}}
					>
						<Typography
							variant="h5"
							sx={{
								marginTop: `20px`,
								color: `#fff`,
								fontFamily: `Gotham-Bold`,
								fontWeight: 400,
								textTransform: `uppercase`,
								fontSize: `20px !important`,
							}}
						>
							USER: {user?.display_name}
						</Typography>
					</Box>
				)}

				<TopTracks ref={container} tracks={tracks} />

				<Button
					variant="contained"
					size="large"
					color="success"
					sx={{
						marginBottom: `10px`,
						zIndex: 1,
					}}
					onClick={() => {
						exportToJPEG(container.current);
					}}
				>
					Download
				</Button>
				<Button
					variant="contained"
					size="large"
					color="success"
					// onClick={() => {
					//   router.push({
					//     pathname: `${process.env.NEXT_PUBLIC_URL}`,
					//   })
					// }}
					sx={{
						marginBottom: `10px`,
						zIndex: 1,
					}}
				>
					<Link
						to={`${import.meta.env.VITE_PUBLIC_URL}`}
						style={{
							color: `#fff`,
						}}
					>
						Logout
					</Link>
				</Button>
			</Box>
		</>
	);
};

export default Home;
