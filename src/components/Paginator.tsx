import { Link } from 'react-router-dom'

export default function Pagination({currentPage, pageCount}: any) {
    const pages = () => {
        const pageLinks = [];
        for(let i=1; i<=pageCount; i++) {
            pageLinks.push(
                <Link to={`/dashboard?page=${i}`} key={i}>
                    <li className={"block cursor-pointer h-8 w-8 rounded bg-opacity-30 hover:bg-opacity-50 transition text-center leading-8 " + (currentPage === i?"bg-[#1a0ff7] text-white":"bg-white")}>
                        {i}
                    </li>
                </Link>
            );
        }
        return pageLinks;
    }
    const nextPage = (currentPage+1 <= pageCount)?`/?page=${currentPage+1}`:"#!";
    const prevPage = (currentPage-1 >= 1)?`/?page=${currentPage-1}`:"#!";
    return(
        <ol className="flex my-10 justify-center gap-1 text-sm font-medium">
			<Link to={prevPage}>
				<li className="inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded bg-base bg-opacity-30 hover:bg-opacity-50 transition">
					<span className="sr-only">Prev Page</span>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
					</svg>
				</li>
			</Link>
            {
               pages()
            }
			<Link to={nextPage}>
				<li className="inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded bg-base bg-opacity-30 hover:bg-opacity-50 transition">
					<span className="sr-only">Next Page</span>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
					</svg>
				</li>
			</Link>
		</ol>
    );
}