Button example:

```js
const ButtonExample = () => {
  return (
    <section>
      <div style={{ marginBottom: 10 }}>
        <Button variant="primary">primary</Button>
        <Button variant="primary_line">primary_line</Button>
        <Button variant="basic">basic</Button>
        <Button variant="basic_line">basic_line</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" disabled>primary</Button>
        <Button variant="primary_line" disabled>primary_line</Button>
        <Button variant="basic" disabled>basic</Button>
        <Button variant="basic_line" disabled>basic_line</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" isLoading="true">primary</Button>
        <Button variant="primary_line" isLoading="true">primary_line</Button>
        <Button variant="basic" isLoading="true">basic</Button>
        <Button variant="basic_line" isLoading="true">basic_line</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" as="a">primary</Button>
        <Button variant="primary_line" as="a">primary_line</Button>
        <Button variant="basic" as="a">basic</Button>
        <Button variant="basic_line" as="a">basic_line</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" size="xlg" style={{marginBottom: '10px'}}>primary</Button>
        <Button variant="primary_line" size="xlg">primary_line</Button>
        <Button variant="basic" size="xlg">basic</Button>
        <Button variant="basic_line" size="xlg">basic_line</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" size="lg">primary</Button>
        <Button variant="primary_line" size="lg">primary_line</Button>
        <Button variant="basic" size="lg">basic</Button>
        <Button variant="basic_line" size="lg">basic_line</Button>
      </div>
    </section>
  )
}

ButtonExample()
```