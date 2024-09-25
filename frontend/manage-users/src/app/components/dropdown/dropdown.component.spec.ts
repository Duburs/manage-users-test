import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    component.writeValue('test');
    expect(component.value).toEqual('test');
  });

  it('should set the options to the provided inputs', () => {
    component.items = ['test1', 'test2'];
    component.placeholder = 'placeholder';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('option')[0].textContent).toContain(
      'placeholder'
    );
    expect(compiled.querySelectorAll('option')[1].textContent).toContain(
      'test1'
    );
    expect(compiled.querySelectorAll('option')[2].textContent).toContain(
      'test2'
    );
  });

  it('should set the options to the provided inputs with required true', () => {
    component.items = ['test3', 'test4'];
    component.placeholder = 'placeholder';
    component.required = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('option')[0].textContent).toContain(
      'placeholder'
    );
    expect(compiled.querySelectorAll('option')[1].textContent).toContain('');
    expect(compiled.querySelectorAll('option')[2].textContent).toContain(
      'test3'
    );
    expect(compiled.querySelectorAll('option')[3].textContent).toContain(
      'test4'
    );
  });

  it('should not emit the value if the value is the same as the previous one', () => {
    let registerSpy = spyOn(component, 'onChange');
    component.writeValue('test');
    expect(registerSpy).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    component.writeValue('test');
  });
});
