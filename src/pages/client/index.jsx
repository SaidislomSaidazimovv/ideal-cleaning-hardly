import { Order } from "@modal";
import { Button } from "@mui/material";
import { OrderTable } from "@ui";
import { useEffect, useState } from "react";
import { client } from "@service";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getData = async () => {
    try {
      const response = await client.get();
      if (response.status === 200 && response?.data?.client_list) {
        setData(response.data.client_list);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const startingTRNumber = indexOfFirstItem + 1;

  const currentItemsWithTR = currentItems.map((item, index) => ({
    ...item,
    trNumber: startingTRNumber + index,
  }));

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Order open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>

        <OrderTable data={currentItemsWithTR} />
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default Index;
