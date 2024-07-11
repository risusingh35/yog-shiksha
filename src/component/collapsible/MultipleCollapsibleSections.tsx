import CollapsibleSection from "./CollapsibleSection";


const MultipleCollapsibleSections = () => {
  return (
    <div>
      <CollapsibleSection
        title="Section 1 Title"
        content="Content of section 1 goes here..."
      />
      <CollapsibleSection
        title="Section 2 Title"
        content="Content of section 2 goes here..."
      />
      <CollapsibleSection
        title="Section 3 Title"
        content="Content of section 3 goes here..."
      />
    </div>
  );
};

export default MultipleCollapsibleSections;
