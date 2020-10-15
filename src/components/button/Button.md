Button example:

```js
const ButtonExample = () => {
  return (
    <section style={{ backgroundColor: '#f8f9fa' }}>
      <div style={{ marginBottom: 10 }}>
        <Button variant="primary">primary</Button>
        <Button variant="basic">basic</Button>
        <Button variant="primary_line">primary_line</Button>
        <Button variant="basic_line">basic_line</Button>
        <Button variant="primary_light">primary_light</Button>
        <Button variant="basic_light">basic_light</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" disabled>primary</Button>
        <Button variant="basic" disabled>basic</Button>
        <Button variant="primary_line" disabled>primary_line</Button>
        <Button variant="basic_line" disabled>basic_line</Button>
        <Button variant="primary_light" disabled>primary_light</Button>
        <Button variant="basic_light" disabled>basic_light</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" isLoading>primary</Button>
        <Button variant="primary_line" isLoading>primary_line</Button>
        <Button variant="basic" isLoading>basic</Button>
        <Button variant="basic_line" isLoading>basic_line</Button>
        <Button variant="primary_light" isLoading>primary_light</Button>
        <Button variant="basic_light" isLoading>basic_light</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" as="a">primary</Button>
        <Button variant="primary_line" as="a">primary_line</Button>
        <Button variant="basic" as="a">basic</Button>
        <Button variant="basic_line" as="a">basic_line</Button>
        <Button variant="primary_light" as="a">primary_light</Button>
        <Button variant="basic_light" as="a">basic_light</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" size="lg">primary</Button>
        <Button variant="primary_line" size="lg">primary_line</Button>
        <Button variant="basic" size="lg">basic</Button>
        <Button variant="basic_line" size="lg">basic_line</Button>
        <Button variant="primary_light" size="lg">primary_light</Button>
        <Button variant="basic_light" size="lg">basic_light</Button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Button variant="primary" size="xlg">primary</Button>
        <Button variant="primary_line" size="xlg">primary_line</Button>
        <Button variant="basic" size="xlg">basic</Button>
        <Button variant="basic_line" size="xlg">basic_line</Button>
        <Button variant="primary_light" size="xlg">primary_light</Button>
        <Button variant="basic_light" size="xlg">basic_light</Button>
      </div>
    </section>
  )
}

ButtonExample()
```