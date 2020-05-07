import * as React from "react";
import { navigate } from "gatsby-link";
import ReactPaginate from "react-paginate";
import { SearchAndFilterContext } from "constants/search-and-filter-context";
import { PageContext } from "types/PageContext";
import { PostListContext } from "constants/post-list-context";

interface PaginationProps {
	pageContext: PageContext;
}
export const Pagination = ({ pageContext }: PaginationProps) => {
	const { pageCount, pageIndex, setCurrentPageIndex } = React.useContext(
		PostListContext
	);
	const { searchVal, filterVal } = React.useContext(SearchAndFilterContext);

	const { relativePath } = pageContext;

	if (!pageCount) return null;

	return (
		<ReactPaginate
			previousLabel={"previous"}
			nextLabel={"next"}
			breakLabel={"..."}
			breakClassName={"break-me"}
			pageCount={pageCount}
			marginPagesDisplayed={2}
			forcePage={pageIndex}
			pageRangeDisplayed={5}
			hrefBuilder={props => `${relativePath}/page/${props}`}
			containerClassName={"pagination"}
			activeClassName={"active"}
			onPageChange={({ selected }) => {
				if (filterVal.length || searchVal) {
					setCurrentPageIndex(selected);
					return;
				}

				// Even though we index at 1 for pages, this component indexes at 0
				const newPageIndex = selected + 1;
				if (newPageIndex === 1) {
					navigate(`${relativePath}/`);
					return;
				}
				navigate(`${relativePath}/page/${newPageIndex}`);
			}}
		/>
	);
};
