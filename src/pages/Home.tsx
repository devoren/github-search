import React, { useEffect, useRef, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from '../store/github/github.api';

function Home() {
	const [search, setSearch] = useState('devoren');
	const [dropDown, setDropDown] = useState(false);
	const debounced = useDebounce(search);
	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
		refetchOnReconnect: true,
	});
	const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
		useLazyGetUserReposQuery();
	const wrapperRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef?.current &&
				!wrapperRef?.current.contains(event.target as Node)
			) {
				setDropDown(false);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	useEffect(() => {
		setDropDown(debounced.length > 0 && data?.length! > 0);
	}, [debounced, data?.length]);

	const clickHandler = (username: string) => {
		setSearch(username);
		setDropDown(false);
		fetchRepos(username);
	};

	return (
		<div className="flex justify-center pt-10 mx-auto h-full w-full">
			{isError && (
				<p className="text-center text-red-600">
					Something went wrong...
				</p>
			)}
			<div className="relative w-[560px]">
				<input
					type="text"
					className="border outline-blue-400 py-2 px-4 w-full h-[42px] mb-2"
					placeholder="Search for Github username..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				{dropDown && (
					<ul
						ref={wrapperRef}
						className="list-none absolute left-0 right-0 top-[42px] max-h-[200px] shadow-md bg-white overflow-y-auto"
					>
						{isLoading && <p className="text-center">Loading...</p>}
						{data?.map((user) => (
							<li
								key={user.id}
								onClick={() => clickHandler(user.login)}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer overflow-y-hidden"
							>
								{user.login}
							</li>
						))}
					</ul>
				)}

				<div className="container">
					{areReposLoading && (
						<p className="text-center">Repos are loading...</p>
					)}
					{repos ? (
						repos.length > 0 ? (
							repos?.map((repo) => (
								<RepoCard repo={repo} key={repo.id} />
							))
						) : (
							<p className="text-center">Repos are empty</p>
						)
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Home;
