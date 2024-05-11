import "./App.css";
import ErcTable from "./components/table/ErcTable";
import { Article } from "./models/Article";
import { TableColumn } from "./components/models/erc-components-types";
import { items } from "./data/articles";
function App() {
  const onEditClick = (item: Article) => {
    window.alert(
      `Edit clicked. \nid: ${item.id}, name: ${item.name} \ndescription: ${item.description}`
    );
    console.log("Edit clicked", item);
  };

  const onRemoveClick = (item: Article) => {
    console.log("remove clicked", item);
  };

  const columns: TableColumn[] = [
    {
      name: "Nr",
      field: (article: Article) => article.id,
      width: 80,
    },
    {
      name: "Name",
      field: (article: Article) => article.brand ?? "unknown brand",
      filter: { type: "text" },
      width: 90,
    },
    {
      name: "Name",
      field: (article: Article) => article.name ?? "unknown name",
      filter: { type: "text" },
      width: 150,
    },
    {
      name: "Description",
      field: (article: Article) => article.description ?? "unknown name",
      filter: { type: "text" },
      width: 320,
    },
    {
      name: "Price",
      field: (article: Article) => (article.price ? `$ ${article.price}` : ""),
      width: 100,
    },
    {
      name: "",
      field: () => "Edit",
      onClicked: onEditClick,
      width: 80,
    },
    {
      name: "",
      field: () => "Remove",
      onClicked: onRemoveClick,
      width: 90,
    },
  ];

  return (
    <>
      <div></div>
      <h2 className="m-4">Easy React Components: TABLE</h2>
      <div className="flex h-full items-center justify-center">
        <ErcTable columns={columns} data={items} pageSize={6} />
      </div>
    </>
  );
}

export default App;
