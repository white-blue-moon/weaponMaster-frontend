export function changePage(target, pageNo) {
    if (pageNo >= 1 && pageNo <= target.totalPage) {
        target.currentPage = pageNo;
        return updatePagination(target);
    }

    return target;
}

export function updatePagination(target) {
    const totalPage   = Math.ceil(target.list.length / target.pageSize) || 1;
    const currentPage = Math.min(target.currentPage, totalPage);

    const start = (currentPage - 1) * target.pageSize;
    const end   = start + target.pageSize;

    const displayed  = target.list.slice(start, end);
    const groupPages = getRangeGroupPage(currentPage, totalPage, target.groupPageSize);

    // 최신 정보로 교체
    target.totalPage   = totalPage;
    target.currentPage = currentPage;
    target.displayed   = displayed;
    target.groupPages  = groupPages;

    return target;
}

function getRangeGroupPage(currentPage, totalPage, groupPageSize) {
    const groupStart = Math.floor((currentPage - 1) / groupPageSize) * groupPageSize + 1;
    const groupEnd   = Math.min(groupStart + groupPageSize - 1, totalPage);

    const pageRange = [];
    for (let pageNo = groupStart; pageNo <= groupEnd; pageNo++) {
        pageRange.push(pageNo);
    }

    return pageRange;
}
