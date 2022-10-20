import React, { memo, useState } from 'react';
import { IRepo } from '../models/models';
import { useAppDispatch, useAppSelector } from '../store';
import { addFavourite, removeFavourite } from '../store/github/github.slice';
interface RepoCardProps {
	repo: IRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
	const dispatch = useAppDispatch();
	const favourite = useAppSelector((state) =>
		state.github.favourites.find((fav) => fav === repo.html_url)
	);

	const [isFav, setIsFav] = useState(!!favourite);

	const AddToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(addFavourite(repo.html_url));
		setIsFav((isFav) => !isFav);
	};

	const removeFromFavourite = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		dispatch(removeFavourite(repo.html_url));
		setIsFav((isFav) => !isFav);
	};

	return (
		<div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank" rel="noreferrer">
				<h2 className="text-xl font-bold">{repo.full_name}</h2>
				<p className="text-sm">
					Forks: <span className="font-bold mr-2">{repo.forks}</span>
					Watchers: <span className="font-bold">{repo.watchers}</span>
				</p>
				<p className="text-sm font-thin">{repo?.description}</p>
			</a>
			{!isFav && (
				<button
					className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all mt-3"
					onClick={AddToFavourite}
				>
					Add
				</button>
			)}
			{isFav && (
				<button
					className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all  mt-3"
					onClick={removeFromFavourite}
				>
					Remove
				</button>
			)}
		</div>
	);
};

export default memo(RepoCard);
