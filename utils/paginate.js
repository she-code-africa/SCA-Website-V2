module.exports = async function paginate(
  cPage,
  firstPage = 1,
  pagesize,
  totalJobsCount) {


  let paginationMetadata;
  let currentPage = Number(cPage);
  let totalPages = Math.ceil(totalJobsCount / pagesize);
  let previous = currentPage > 1 ? currentPage - 1 : false;

  paginationMetadata = {
    currentPage,
    pagesize,
    totalPages,
    previous,
    first: firstPage,
    next: currentPage + 1,                  
    last: totalPages,
    pages: Array.from({length: totalPages}, (_, i) => i + 1)
  }
    return paginationMetadata;
}
